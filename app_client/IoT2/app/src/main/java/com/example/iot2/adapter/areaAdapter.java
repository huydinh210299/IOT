package com.example.iot2.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.example.iot2.R;
import com.example.iot2.model.Area;

import java.util.List;

import static android.os.Build.VERSION_CODES.R;

public class areaAdapter extends BaseAdapter {
    private Context context;
    private int layout;
    private List<Area> areaList;

    public areaAdapter(Context context, int layout, List<Area> areaList) {
        this.context = context;
        this.layout = layout;
        this.areaList = areaList;
    }

    @Override
    public int getCount() {
        return areaList.size();
    }

    @Override
    public Object getItem(int i) {
        return null;
    }

    @Override
    public long getItemId(int i) {
        return 0;
    }

    private class ViewHolder{
        TextView textView;
    }
    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        ViewHolder holder;
        if(view==null){
            holder=new ViewHolder();
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            view= inflater.inflate(layout,null);
            holder.textView= (TextView) view.findViewById(com.example.iot2.R.id.area);
            view.setTag(holder);
        }else {
            holder= (ViewHolder) view.getTag();
        }
        Area area =areaList.get(i);
        holder.textView.setText(area.getArea());
        return view;
    }
}
