package yrx.services;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import yrx.exception.ObjectRetrievalException;
import yrx.model.Category;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoriesService {

    @RequestMapping(method = RequestMethod.GET, produces = "application/json",
            consumes = "application/json")
    public List<String> getCategories()throws ObjectRetrievalException {
        try (Session session = HibernateConn.getSessionFactory().openSession()) {
            String s = "select name from Category";
            Query<String> query = session.createQuery(s);
            List<String> categories = query.list();
            if (categories == null) {
                throw new ObjectRetrievalException("Object after persist is came as null");
            }
            System.out.println("call from categories");
            return categories;
        }
    }
}
