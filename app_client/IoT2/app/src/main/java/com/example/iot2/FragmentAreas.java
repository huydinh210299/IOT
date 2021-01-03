package com.example.iot2;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.GridView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import com.example.iot2.adapter.areaAdapter;
import com.example.iot2.model.Area;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

public class FragmentAreas extends Fragment {
    View view;
    GridView gridView;
    areaAdapter adapter;

    ArrayList<Area> areas;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_areas, container, false);
        ActionBar actionBar =((AppCompatActivity)getActivity()).getSupportActionBar();
        actionBar.setTitle("Area");
        gridView= view.findViewById(R.id.gridView);
        areas =new ArrayList<>();
        for (int i=1;i<=20;i++){
            areas.add(new Area("Area "+i));
        }
        adapter=new areaAdapter(getContext(),R.layout.layout_item_area,areas);
        gridView.setAdapter(adapter);

        gridView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                MainActivity.bottomNavigationView.setSelectedItemId(R.id.nav_2);
            }
        });





        return view;
    }
}
