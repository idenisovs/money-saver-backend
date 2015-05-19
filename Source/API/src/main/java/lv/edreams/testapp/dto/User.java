/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package lv.edreams.testapp.dto;

/**
 *
 * @author Ga5Xz2
 */
public class User
{
    private static int Counter = 0;
    
    private final int id;
    
    private String name;
    
    private String message;
    
    public User() 
    {
        id = ++Counter;
    }
    
    public User(String name)
    {
        this();
        
        this.name = name;
    }

    public int getId()
    {
        return id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getMessage()
    {
        return message;
    }

    public void setMessage(String message)
    {
        this.message = message;
    }
    
    public static int Count()
    {
        return Counter;
    }
}
