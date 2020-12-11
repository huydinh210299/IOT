package com.example.iot2;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.example.iot2.api.ApiClient;
import com.example.iot2.model.loginRequest;
import com.example.iot2.model.loginResponse;
import com.example.iot2.model.registerRequest;
import com.example.iot2.model.registerResponse;

import java.util.regex.Pattern;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegisterActivity extends AppCompatActivity {
    String html;
    TextView text, hide1, hide2,hide3, hide4;
    EditText txt6Email, txt10Pass,txt12Pass2,textName;
    Button btn;
    int check=0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        txt6Email=findViewById(R.id.txt6);
        txt10Pass=findViewById(R.id.txt10);
        txt12Pass2=findViewById(R.id.txt12);
        textName=findViewById(R.id.txt4);
        hide1 = findViewById(R.id.hide1);
        hide2 = findViewById(R.id.hide2);
        hide3 = findViewById(R.id.hide3);
        hide4 = findViewById(R.id.hide4);
        btn=findViewById(R.id.btn);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String username = textName.getText().toString();
                String email = txt6Email.getText().toString().trim();
                String pass = txt10Pass.getText().toString().trim();
                String pass2 = txt12Pass2.getText().toString().trim();
                dialog(username,email,pass);
//
//                if (checkEmail(email)) {
//                    check=1;
//                    hide1.setVisibility(View.GONE);
//                } else {
//                    check=0;
//                    hide1.setText("X Your email is wrong");
//                    hide1.setVisibility(View.VISIBLE);
//                }
//
//                if (checkPass(pass)) {
//                    check=1;
//                    hide3.setVisibility(View.GONE);
//                } else {
//                    check =0;
//                    hide3.setText("Mật khẩu gồm từ 4-16 kí tự và phải đảm bảo điều kiện có 1 chữ in hoa,1 chữ in thường , 1 kí tự và 1 số");
//                    hide3.setVisibility(View.VISIBLE);
//                }
//                if (checkPass2()) {
//                    check=1;
//                    hide4.setVisibility(View.GONE);
//                } else {
//                    check = 0;
//                    hide4.setText("Mật khẩu không khớp");
//                    hide4.setVisibility(View.VISIBLE);
//                }
//
//                if( check==1){
//                    dialog();
//                }

            }
        });

    }
//    private boolean checkPass(String pass) {
//        String PATTERN_PASSWORD = "[a-z0-9_-]{6,18}$";
//        return Pattern.matches(PATTERN_PASSWORD, pass);
//    }
//    private boolean checkUsername(String pass) {
//        String PATTERN_PASSWORD = "[a-z0-9_-]{6,18}$";
//        return Pattern.matches(PATTERN_PASSWORD, pass);
//    }
//
//    private boolean checkEmail(String email) {
//        String PATTERN_EMAIL = "^[_A-Za-z0-9-\\\\+]+(\\\\.[_A-Za-z0-9-]+)*@”\n" + "+ “[A-Za-z0-9-]+(\\\\.[A-Za-z0-9]+)*(\\\\.[A-Za-z]{2,})$";
//        return Pattern.matches(PATTERN_EMAIL, email);
//    }
//    private boolean checkPass2(){
//        String s1= txt10Pass.getText().toString().trim();
//        String s2=txt12Pass2.getText().toString().trim();
//        return s1.equals(s2);
//    }
    private  void dialog(String username,String email,String pass){
        AlertDialog.Builder alertDialog =new AlertDialog.Builder(this);

        alertDialog.setTitle("Thông báo");
        alertDialog.setMessage("Bạn đã đăng kí thành công! \nHãy đăng nhập để tiếp tục.");
        alertDialog.setPositiveButton("OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                register(username,email,pass);

            }
        });
        alertDialog.show();
    }
    private void register(String username,String email,String pass){
        registerRequest registerRequest =new registerRequest(username,email,pass,"admin");
        Call<registerResponse> responseCall = ApiClient.getClient().postRegister(registerRequest);
        responseCall.enqueue(new Callback<registerResponse>() {
            @Override
            public void onResponse(Call<registerResponse> call, Response<registerResponse> response) {
                Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
                startActivity(intent);
            }

            @Override
            public void onFailure(Call<registerResponse> call, Throwable t) {

            }
        });
    }
}