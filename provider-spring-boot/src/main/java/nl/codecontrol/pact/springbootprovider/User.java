package nl.codecontrol.pact.springbootprovider;

public class User {

    private final long id;
    private final String firstname;
    private final String lastname;

    public User(long id, String firstname, String lastname) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public long getId() {
        return id;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }
}
