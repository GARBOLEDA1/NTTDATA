package runner;

import com.intuit.karate.junit5.Karate;

public class Runner {
    @Karate.Test
    Karate testAll() {
        // Usa classpath directo para evitar errores de inicialización
        return Karate.run("classpath:features/petStore/mascota.feature");
    }
}


