package runner;

import com.intuit.karate.junit5.Karate;

class Runner {

    @Karate.Test
    Karate testMascota() {
        // Usa classpath absoluto
        return Karate.run("classpath:features/petStore/mascota.feature");
    }
}


