package yrx.services;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.web.bind.annotation.*;
import yrx.exception.ObjectCreationFailedException;
import yrx.exception.ObjectRetrievalException;
import yrx.model.Classified;

import java.io.File;
import java.util.List;
import java.util.Optional;

import static com.sun.xml.internal.ws.api.model.wsdl.WSDLBoundOperation.ANONYMOUS.optional;

@RestController
@RequestMapping("/classifieds")
public class ClassifiedService {

    @RequestMapping(value = "/classifiedscount", method = RequestMethod.GET, produces = "application/json",
            consumes = "application/json")
    public Long getClassifiedsCount(@RequestParam(value = "location") String location,
                                    @RequestParam(value = "category") String category)
            throws ObjectRetrievalException {
        try (Session session = HibernateConn.getSessionFactory().openSession()) {

            String s = "select count(*) from Classified ";
            if(!category.equalsIgnoreCase("default")){
                s = s + "a where a.category = '" + category +"'";
            }
            if(location !="") {
                if(category.equalsIgnoreCase("default"))
                    s = s + "a where ";
                else
                    s= s+ " AND ";
                s = s + "a.location = '" + location + "'";
            }
            Long count = session.createQuery(s,Long.class).getSingleResult();
            return count;
        }
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json",
            consumes = "application/json")
    public List<Classified> getClassifieds(@RequestParam(value = "location") String location,
                                           @RequestParam(value = "category") String category,
                                           @RequestParam(value = "page") int page)
            throws ObjectRetrievalException {
        try (Session session = HibernateConn.getSessionFactory().openSession()) {

            String s = "from Classified ";
            if(!category.equalsIgnoreCase("default")){
                s = s + "a where a.category = '" + category +"'";
            }
            if(location !="") {
                if(category.equalsIgnoreCase("default"))
                    s = s + "a where ";
                else
                    s= s+ " AND ";
                s = s + "a.location = '" + location + "'";
            }
            //s = s + " OFFSET " +  1 + " ROWS FETCH NEXT " + 10 + " ROWS ONLY";
            System.out.println(s);
            Query<Classified> query = session.createQuery(s, Classified.class);
//            query.setFirstResult((page-1)*10);
//            query.setMaxResults(10);
            List<Classified> classifieds = query.list();
            if (classifieds == null) {
                throw new ObjectRetrievalException("Object after persist is came as null");
            }
            return classifieds;
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = "application/json",
            consumes = "application/json")
    public Classified getClassified(@PathVariable("id") String id) throws ObjectRetrievalException {
        try (Session session = HibernateConn.getSessionFactory().openSession()) {
            Query<Classified> query = session.createQuery("from Classified a where a.id = '" + id + "'", Classified.class);
            List<Classified> classifieds = query.list();
            if (classifieds == null || classifieds.size() != 1) {
                throw new ObjectRetrievalException(id, "Object after persist is came as null");
            }
            return classifieds.iterator().next();
        }
    }

   @RequestMapping(value = "/new", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
   //@RequestMapping(value = "/new", method = RequestMethod.POST, consumes = "multipart/form-data")
    public Classified saveClassified(@RequestBody Classified classified) throws ObjectCreationFailedException {
        Transaction transaction = null;
        Session session = null;
        try {
            session = HibernateConn.getSessionFactory().openSession();
            transaction = session.getTransaction();
            transaction.begin();
            session.persist(classified);
            transaction.commit();
            Classified savedClassified = session.get(Classified.class, classified.getId());
            if (savedClassified == null) {
                throw new ObjectRetrievalException(classified.getId(), "Object after persist is came as null");
            }
            return savedClassified;
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            if (session != null) {
                session.close();
            }
            throw new ObjectCreationFailedException(e.getMessage());
        }
    }
}
