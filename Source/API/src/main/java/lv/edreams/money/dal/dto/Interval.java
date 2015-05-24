/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package lv.edreams.money.dal.dto;

import java.util.Date;

/**
 *
 * @author Ga5Xz2
 */
public class Interval
{
    private Date from;
    
    private Date till;
    
    private double startingSum;

    public Date getFrom()
    {
        return from;
    }

    public void setFrom(Date from)
    {
        this.from = from;
    }

    public Date getTill()
    {
        return till;
    }

    public void setTill(Date till)
    {
        this.till = till;
    }

    public double getStartingCash()
    {
        return startingSum;
    }

    public void setStartingCash(double startingCash)
    {
        this.startingSum = startingCash;
    }
    
    
}
