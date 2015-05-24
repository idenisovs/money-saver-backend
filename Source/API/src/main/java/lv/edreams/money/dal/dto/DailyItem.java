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
public class DailyItem
{
    private Date date;
    
    private double summary;
    
    private double expenses;
    
    private double rest;
    
    private double balance;
    
    private double dailyBalance;
    
    private double expectations;

    public Date getDate()
    {
        return date;
    }

    public void setDate(Date date)
    {
        this.date = date;
    }

    public double getSummary()
    {
        return summary;
    }

    public void setSummary(double summary)
    {
        this.summary = summary;
    }

    public double getExpenses()
    {
        return expenses;
    }

    public void setExpenses(double expenses)
    {
        this.expenses = expenses;
    }

    public double getRest()
    {
        return rest;
    }

    public void setRest(double rest)
    {
        this.rest = rest;
    }

    public double getBalance()
    {
        return balance;
    }

    public void setBalance(double balance)
    {
        this.balance = balance;
    }

    public double getDailyBalance()
    {
        return dailyBalance;
    }

    public void setDailyBalance(double dailyBalance)
    {
        this.dailyBalance = dailyBalance;
    }

    public double getExpectations()
    {
        return expectations;
    }

    public void setExpectations(double expectations)
    {
        this.expectations = expectations;
    }
}
