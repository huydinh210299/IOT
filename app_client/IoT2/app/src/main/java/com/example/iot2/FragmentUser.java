package com.example.iot2;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.RecyclerView;

import com.auth0.android.jwt.JWT;

import org.json.JSONObject;

public class FragmentUser extends Fragment {
    private JWT jwt;
    private String decoded;
    private String token;
    TextView txt1,txt2,txt3,txt4,txt5,txtname,txtRole;
    Button btnLogout;
    View view;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_user, container, false);
        final Animation animation = AnimationUtils.loadAnimation(getActivity(), R.anim.anim_1);
        ActionBar actionBar =((AppCompatActivity)getActivity()).getSupportActionBar();
        actionBar.setTitle("Cá nhân");
        anhxa();
        SharedPreferences sharedPreferences= PreferenceManager.getDefaultSharedPreferences( view.getContext());
        SharedPreferences.Editor editor =sharedPreferences.edit();
        Log.d("token Main", sharedPreferences.getString("token",""));
        token=sharedPreferences.getString("token","");
        try{
            String decoded=JWTUtils.decoded(token);
            JSONObject jsonObject = new JSONObject(decoded);
            txtname.setText(jsonObject.getString("email"));
            txtRole.setText(jsonObject.getString("role"));
        }catch (Exception e){

        }

        txt1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                view.startAnimation(animation);
            }
        });
        txt2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                view.startAnimation(animation);
            }
        });
        txt3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                view.startAnimation(animation);
            }
        });
        txt4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                view.startAnimation(animation);
            }
        });
        txt5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                view.startAnimation(animation);
            }
        });

        btnLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                SharedPreferences.Editor editor =sharedPreferences.edit();
                editor.remove("token").commit();
                Intent intent =new Intent(getActivity(),LoginActivity.class);
                startActivity(intent);
            }
        });



        return view;
    }

    public void anhxa(){
        txt1 =view.findViewById(R.id.t1);
        txt2 =view.findViewById(R.id.t2);
        txt3 =view.findViewById(R.id.t3);
        txt5 =view.findViewById(R.id.t5);
        txt4 =view.findViewById(R.id.t4);
        txtname=view.findViewById(R.id.textView7);
        txtRole=view.findViewById(R.id.textView8);
        btnLogout=view.findViewById(R.id.btnLogout);
    }


}
