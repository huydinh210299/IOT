package com.example.iot2;

import android.app.Dialog;
import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.TimePicker;
import android.widget.Toast;
import android.widget.ToggleButton;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import com.auth0.android.jwt.JWT;
import com.example.iot2.api.ApiClient;
import com.example.iot2.model.Sensor;
import com.github.mikephil.charting.charts.LineChart;
import com.github.mikephil.charting.components.Description;
import com.github.mikephil.charting.data.Entry;
import com.github.mikephil.charting.data.LineData;
import com.github.mikephil.charting.data.LineDataSet;
import com.github.mikephil.charting.interfaces.datasets.ILineDataSet;


import org.eclipse.paho.android.service.MqttAndroidClient;
import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static android.content.Context.MODE_PRIVATE;


public class FragmentHome extends Fragment {
    private JWT jwt;
    private String decoded;
    private String token;
    String time;
    String timeLight, timePump;
    LineChart lineChart;

//    SharedPreferences sharedPreferences= PreferenceManager.getDefaultSharedPreferences( getContext());
//    SharedPreferences.Editor editor =sharedPreferences.edit();
    ProgressBar progressBar;
    ToggleButton toggle1, toggle2;
    Button btnAlarm;
    MqttAndroidClient client;
    TextView textView, textView5, txtNhietdo, txtDat, txtKhongkhi;
    View view;
    String sensorResponse;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_home, container, false);
        Date date = new Date();
        long time = date.getTime();
        long time0 = time-1000*60*60*24;// 20 ngày trươc
        // line chart
        getSensor( String.valueOf(time0), String.valueOf(time));//

        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(view.getContext());
        SharedPreferences.Editor editor = sharedPreferences.edit();
        Log.d("token Main", sharedPreferences.getString("token", ""));
        token = sharedPreferences.getString("token", "");

        anhxa();
        ActionBar actionBar = ((AppCompatActivity) getActivity()).getSupportActionBar();
        actionBar.setTitle("Smart Farm");

        btnAlarm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                DialogAlarm();
            }
        });

        //  toggle
        toggle1.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (isChecked) {
                    //  Toast.makeText(getActivity(),"on",Toast.LENGTH_SHORT).show();
                    pub("Light", "{ \"Status\" : \"1\"}");
                } else {
                    pub("Light", "{ \"Status\" : \"0\"}");
                    //  Toast.makeText(getActivity(),"off",Toast.LENGTH_SHORT).show();
                }
            }
        });
        toggle2.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (isChecked) {
                    //  Toast.makeText(getActivity(),"on",Toast.LENGTH_SHORT).show();
                    pub("Pump", "{ \"Status\" : \"1\"}");
                } else {
                    pub("Pump", "{ \"Status\" : \"0\"}");
                    //  Toast.makeText(getActivity(),"off",Toast.LENGTH_SHORT).show();
                }
            }
        });

        //MQTT
        if (isOnline()) {
            MqttConnectOptions options = new MqttConnectOptions();
            options.setUserName("esp8266");
            options.setPassword("123456".toCharArray());
            String clientId = MqttClient.generateClientId();
            client = new MqttAndroidClient(getActivity().getApplicationContext(), "tcp://168.62.43.5:1883",
                    clientId);

            client.setCallback(new MqttCallback() {
                @Override
                public void connectionLost(Throwable cause) {
                    Log.d("mqtt", "sai");
                }

                @Override
                public void messageArrived(String topic, MqttMessage message) throws Exception {
                    Log.d("mqttcall",  "callback "+topic+message.toString() );

                    textView.setText(message.toString());//test
                    sensorResponse = message.toString();//test
                    JSONObject jsonObject = new JSONObject(sensorResponse);
                    txtNhietdo.setText(jsonObject.getString("temperature"));
                    txtDat.setText(jsonObject.getString("humidityLand"));
                    txtKhongkhi.setText(jsonObject.getString("humidityAir"));
                    //test
                   // Log.d("test sensor",  "callback test "+topic+message.toString() );
//                      if(jsonObject.getString("ledStatus").equals("0")){Log.d("testledStatus",  "callback"+topic+message.toString() );
//                          toggle1.setChecked(true);
//                      }else toggle1.setChecked(false);
//                      if(jsonObject.getString("bumpStatus").equals("0")){Log.d("testbumpStatus",  "callback"+topic+message.toString() );
//                          toggle2.setChecked(true);
//                      }else toggle2.setChecked(false);
                    int s1= Integer.parseInt(jsonObject.getString("ledStatus"));
                    int s2 =Integer.parseInt(jsonObject.getString("bumpStatus"));
                    if(s1==1){
                        toggle1.setChecked(false);
                    }else toggle1.setChecked(true);
                    if(s2==1){
                        toggle1.setChecked(false);
                    }else toggle1.setChecked(true);


                }

                @Override
                public void deliveryComplete(IMqttDeliveryToken token) {

                }
            });

            try {
                IMqttToken token = client.connect(options);
                token.setActionCallback(new IMqttActionListener() {
                    @Override
                    public void onSuccess(IMqttToken asyncActionToken) {
                        // We are connected
                        Log.d("mqtt", "connect onSuccess");
//                    pub("alo test");
                        Subscribe("demo");
                        Subscribe("sensor");
                    }

                    @Override
                    public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
                        Log.d("mqtt", "onFailure");

                    }
                });
            } catch (MqttException e) {
                e.printStackTrace();
            }
        }

        return view;
    }
    //publish
    void pub(String Topic, String content) {
        String topic = Topic;
        String payload = content;
        byte[] encodedPayload = new byte[0];
        try {
            encodedPayload = payload.getBytes("UTF-8");
            MqttMessage message = new MqttMessage(encodedPayload);
            client.publish(topic, message);
        } catch (MqttException | UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    //subscribe
    void Subscribe(String Topic) {
        String topic = Topic;
        int qos = 1;
        try {
            IMqttToken subToken = client.subscribe(topic, qos);
            subToken.setActionCallback(new IMqttActionListener() {
                @Override
                public void onSuccess(IMqttToken asyncActionToken) {
                    Log.d("mqtt", "sub success");
                }

                @Override
                public void onFailure(IMqttToken asyncActionToken,
                                      Throwable exception) {
                }
            });
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public void anhxa() {
        toggle1 = (ToggleButton) view.findViewById(R.id.btn1);
        toggle2 = (ToggleButton) view.findViewById(R.id.btn2);
        textView = view.findViewById(R.id.textView);
        textView5 = view.findViewById(R.id.textView5);
        //button = view.findViewById(R.id.button);
        txtDat = view.findViewById(R.id.dat);
        txtKhongkhi = view.findViewById(R.id.khongkhi);
        txtNhietdo = view.findViewById(R.id.nhietdo);
        btnAlarm = view.findViewById(R.id.alarm);
        lineChart = view.findViewById(R.id.lineChart);
        progressBar=view.findViewById(R.id.progressBar);

    }

    private void DialogAlarm() {
        Dialog dialog = new Dialog(getContext());
        dialog.setContentView(R.layout.diglog_alarm);
        dialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        Button btnHuy = (Button) dialog.findViewById(R.id.button3);
        Button btnXacNhan = (Button) dialog.findViewById(R.id.button2);
        TimePicker timePicker = (TimePicker) dialog.findViewById(R.id.timePicker);
        timePicker.setIs24HourView(true);
        RadioButton den = (RadioButton) dialog.findViewById(R.id.den);
        RadioButton nuoc = (RadioButton) dialog.findViewById(R.id.nuoc);
        EditText edtTime= dialog.findViewById(R.id.editTextNumber);
        Calendar calendar=Calendar.getInstance();
        SimpleDateFormat simpleDateFormat=new SimpleDateFormat("HH:mm");
        time = simpleDateFormat.format(calendar.getTime());
        timePicker.setOnTimeChangedListener(new TimePicker.OnTimeChangedListener() {
            @Override
            public void onTimeChanged(TimePicker timePicker, int hour, int min) {
                calendar.set(0,0,0,hour,min,00);
                String t = hour + ":" + min;
                time = simpleDateFormat.format(calendar.getTime());
            }
        });

        btnHuy.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dialog.dismiss();
            }
        });

        btnXacNhan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (den.isChecked()) {
                    timeLight = time;
                   // textView.setText(timeLight);
                    String alarmLight = "{ \"alarm\" : \"" + timeLight +"\",\"time\" : \""+edtTime.getText().toString().trim()+"\"}";
                    pub("alarmLight", alarmLight);
                }
                if(nuoc.isChecked()){
                    timePump = time;
                  //  textView5.setText(timePump);
                    String alarmPump = "{ \"alarm\" : \"" + timePump +"\",\"time\" : \""+edtTime.getText().toString().trim()+"\"}";
                    pub("alarmPump", alarmPump);
                }
                dialog.dismiss();

            }
        });
        dialog.show();
    }

    //check Online
    public boolean isOnline() {
        ConnectivityManager cm = (ConnectivityManager) getActivity().getSystemService(getContext().CONNECTIVITY_SERVICE);
        NetworkInfo netInfo = cm.getActiveNetworkInfo();
        if (netInfo != null && netInfo.isConnectedOrConnecting()) {
            return true;
        } else {
            return false;
        }
    }

    // Call api -> LineChart
    public void getSensor(String TimeBegin, String TimeEnd) {
        long timestamp1 = Long.parseLong(TimeBegin);
        long timestamp2 = Long.parseLong(TimeEnd);
        Date date1 = new Date(timestamp1);
        Date date2 = new Date(timestamp2);
        SimpleDateFormat jdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        jdf.setTimeZone(TimeZone.getTimeZone("GMT+7"));
        String java_date1 = jdf.format(date1);
        String java_date2 = jdf.format(date2);
 //       Log.d("testDate", java_date1);
//
//        String begin,end;
//        begin="1604177516000";
//        end="1606769516000";
        String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhc2VzdGFyc0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MDQxNTExMTd9.Xc65JgjOPNWw_PATe_YtzhdFtsTYUW13zBfuJo4mjpA";
        Call<List<Sensor>> call = ApiClient.getClient().getListSensor(TimeBegin, TimeEnd, "Bearer " + token);
        call.enqueue(new Callback<List<Sensor>>() {
            @Override
            public void onResponse(Call<List<Sensor>> call, Response<List<Sensor>> response) {
                List<Sensor> sensors = response.body();
                //chart
                int numDataPoints = sensors.size();
                ArrayList<String> x = new ArrayList<>();
                ArrayList<Entry> yhumidityAir = new ArrayList<>();
                ArrayList<Entry> yhumidityLand = new ArrayList<>();
                ArrayList<Entry> yTemperature = new ArrayList<>();
                for (int i = 0; i < numDataPoints; i++) {
                    yhumidityAir.add(new Entry(i, sensors.get(i).getHumidityAir().intValue()));
                    yhumidityLand.add(new Entry(i, sensors.get(i).getHumidityLand().intValue()));
                    yTemperature.add(new Entry(i, sensors.get(i).getTemperature().intValue()));
                    x.add(i, sensors.get(i).getTime().toString());
                }
                String[] xaxes = new String[x.size()];
                for (int i = 0; i < x.size(); i++) {
                    xaxes[i] = x.get(i).toString();
                }

                ArrayList<ILineDataSet> lineDataSets = new ArrayList<>();

                LineDataSet lineDataSet1 = new LineDataSet(yhumidityAir, "độ ẩm không khí\n");
                lineDataSet1.setDrawCircles(false);
                lineDataSet1.setColor(Color.BLUE);

                LineDataSet lineDataSet2 = new LineDataSet(yhumidityLand, "độ ẩm đất\n");
                lineDataSet2.setDrawCircles(false);
                lineDataSet2.setColor(Color.RED);

                LineDataSet lineDataSet3 = new LineDataSet(yTemperature, "Nhiệt độ\n");
                lineDataSet3.setDrawCircles(false);
                lineDataSet3.setColor(Color.BLACK);

                lineDataSets.add(lineDataSet1);
                lineDataSets.add(lineDataSet2);
                lineDataSets.add(lineDataSet3);

                lineChart.setData(new LineData(lineDataSets));
                lineChart.setVisibleXRangeMaximum(65f);
                Description description = new Description();
                description.setText(java_date2);
                lineChart.setDescription(description);
                lineChart.setVisibility(View.VISIBLE);
                progressBar.setVisibility(View.GONE);
            }

            @Override
            public void onFailure(Call<List<Sensor>> call, Throwable t) {
                Log.d("Error: ", t.getMessage());
            }
        });


    }

}
