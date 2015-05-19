/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package lv.edreams.testapp;

import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import lv.edreams.testapp.dto.User;

/**
 *
 * @author Ga5Xz2
 */
@Path("/")
public class Services
{
    @GET
    @Path("/say/{name}")
    @Produces("application/json")
    public Response sayHello(@PathParam("name") String name)
    {
        User user = new User();
               
        user.setName(name);
        
        user.setMessage("Hello, " + name + "!");
        
        List<User> users = generateUsers();
        
        users.add(user);
       
        return Response.ok(users).build();
    }
    
    private List<User> generateUsers()
    {
        List<User> users = new ArrayList();
        
        users.add(new User("M"));
        
        users.add(new User("Q"));
        
        return users;
    }
}
