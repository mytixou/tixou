package fr.tixou.archisolver.cucumber;

import fr.tixou.archisolver.ArchisolverApp;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;

@CucumberContextConfiguration
@SpringBootTest(classes = ArchisolverApp.class)
@WebAppConfiguration
public class CucumberTestContextConfiguration {}
