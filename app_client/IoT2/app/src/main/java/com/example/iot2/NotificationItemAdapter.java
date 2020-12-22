package com.example.iot2;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.iot2.model.NotificationItem;

import java.util.List;

public class NotificationItemAdapter extends RecyclerView.Adapter {
    List<NotificationItem> items;
    Context context;

    public NotificationItemAdapter(List<NotificationItem> items, Context context) {
        this.items = items;
        this.context = context;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.layout_item_notifi,parent,false);
        return new NotificationViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {

        NotificationViewHolder viewHolder = (NotificationViewHolder) holder;
        NotificationItem item=items.get(position);

        viewHolder.txtContent.setText(item.getContent());
        viewHolder.txtTime.setText(item.getTine());
    }

    @Override
    public int getItemCount() {
        return items.size();
    }

    public class NotificationViewHolder extends RecyclerView.ViewHolder{

        TextView txtContent;
        TextView txtTime;
        public NotificationViewHolder(@NonNull View itemView) {
            super(itemView);
            txtContent=itemView.findViewById(R.id.txtContent);
            txtTime=itemView.findViewById(R.id.txtTime);
        }
    }
}
