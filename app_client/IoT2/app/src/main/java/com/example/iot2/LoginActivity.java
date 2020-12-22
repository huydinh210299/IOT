package com.example.iot2;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.iot2.api.ApiClient;
import com.example.iot2.model.loginRequest;
import com.example.iot2.model.loginResponse;

import java.util.prefs.Preferences;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    Button btnLogin, btnSignUp;
    EditText txtemail, txtpass;
    String email, pass;
    public loginResponse loginResponse;
    String messagesToken;

    SharedPreferences sharedPreferences;
    SharedPreferences.Editor editor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        btnLogin = findViewById(R.id.btnLogin);
        txtemail = findViewById(R.id.editTextEmail);
        txtpass = findViewById(R.id.editTextPass);
        btnSignUp = findViewById(R.id.btnSignUp);
        //    sharedPreferences =getSharedPreferences("dataToken",MODE_PRIVATE);
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                email = txtemail.getText().toString().trim();
                pass = txtpass.getText().toString().trim();
//                            Intent intent = new Intent(LoginActivity.this, MainActivity.class);
//                            startActivity(intent);
                login();
            }
        });
        btnSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(LoginActivity.this, RegisterActivity.class);
                startActivity(intent);
            }
        });


    }

    public void login() {
        loginRequest loginRequest = new loginRequest(email, pass);
        Call<loginResponse> responseCall = ApiClient.getClient().postLogin(loginRequest);
        responseCall.enqueue(new Callback<loginResponse>() {
            @Override
            public void onResponse(Call<loginResponse> call, Response<loginResponse> response) {
                loginResponse = response.body();
                //   Log.d("test", response.message());
                if (response.message().toString().trim().equals("OK")) {
                    messagesToken = loginResponse.getAccessToken().toString();
                    Log.d("token", messagesToken);
                    editor = sharedPreferences.edit();
                    editor.putString("token", messagesToken);
                    editor.commit();
                    Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                    startActivity(intent);
                } else {
                    //String messagesToken = loginResponse.getAccessToken();
                    Toast.makeText(LoginActivity.this, "Kiểm tra lại thông tin", Toast.LENGTH_SHORT).show();

                }
            }

            @Override
            public void onFailure(Call<loginResponse> call, Throwable t) {
                t.printStackTrace();

            }
        });
    }


}