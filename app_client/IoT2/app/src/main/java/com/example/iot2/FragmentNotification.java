package com.example.iot2;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.iot2.model.NotificationItem;

import java.util.ArrayList;
import java.util.List;

public class FragmentNotification extends Fragment {
    View view;
    NotificationItemAdapter adapter;
    List<NotificationItem> items;
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
         view = inflater.inflate(R.layout.fragment_notification, container, false);
        ActionBar actionBar =((AppCompatActivity)getActivity()).getSupportActionBar();
        actionBar.setTitle("Thông báo");
        final RecyclerView recyclerView =view.findViewById(R.id.recyclerview);

        items=new ArrayList<>();
        items.add(new NotificationItem("aloooooo1","24/11/2020"));
        items.add(new NotificationItem("aloooooo2","24/11/2020"));
        items.add(new NotificationItem("aloooooo3","24/11/2020"));
        items.add(new NotificationItem("aloooooo4","24/11/2020"));
        items.add(new NotificationItem("aloooooo5","24/11/2020"));
        recyclerView.setHasFixedSize(true);
        LinearLayoutManager layoutManager =new LinearLayoutManager(getActivity(),LinearLayoutManager.VERTICAL,false);
        recyclerView.setLayoutManager(layoutManager);
        DividerItemDecoration dividerItemDecoration = new DividerItemDecoration(recyclerView.getContext(),layoutManager.getOrientation());
        recyclerView.addItemDecoration(dividerItemDecoration);
        adapter = new NotificationItemAdapter(items,getActivity());
        recyclerView.setAdapter(adapter);


        return view;
    }
}
