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

            }
        });

    }
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