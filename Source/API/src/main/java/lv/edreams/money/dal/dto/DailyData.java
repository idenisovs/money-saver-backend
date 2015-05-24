/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package lv.edreams.money.dal.dto;

import java.util.List;

/**
 *
 * @author Ga5Xz2
 */
public class DailyData
{
    private int id;
    
    private Interval interval;
    
    private List<DailyItem> records;
}
