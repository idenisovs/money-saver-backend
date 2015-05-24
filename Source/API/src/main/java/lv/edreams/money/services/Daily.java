package lv.edreams.money.services;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

/**
 *
 * @author Ga5Xz2
 */
@Path("/daily")
public class Daily 
{
    @GET
    @Path("/get")
    @Produces("application/json")
    public Response getAllData()
    {
        return Response.ok("Ok!").build();
    }
}
