package nl.codecontrol.pact.springbootprovider;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final AtomicLong counter = new AtomicLong();
    private final Map<Long, User> currentUsers = new HashMap<>();

    {
        counter.set(1L);
        currentUsers.put(1L, new User(1, "MrFirst", "Tester"));
    }

    @GetMapping("/api/users/{id}")
    public User getUser(@PathVariable("id") long id) {
        return currentUsers.get(id);
    }

    @PostMapping("/api/users")
    public Long createUser(@RequestBody User receivedUser) {
        User newUser = new User(counter.incrementAndGet(), receivedUser.getFirstname(), receivedUser.getLastname());
        currentUsers.put(counter.get(), newUser);
        return counter.get();
    }

    @PutMapping("/api/users/{id}")
    public User updateUser(@PathVariable("id") long id, @RequestBody User updateUser) {
        // Implement me
        return new User(id, updateUser.getFirstname(), updateUser.getLastname());
    }
}
