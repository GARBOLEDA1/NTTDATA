package com.pruebas.runners;

import com.pruebas.util.*;
import io.cucumber.junit.CucumberOptions;
import net.thucydides.model.environment.SystemEnvironmentVariables;
import net.thucydides.model.util.EnvironmentVariables;
import org.junit.runner.RunWith;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features/saucedemo.feature",
        glue = {"com.pruebas.glue"},
        plugin = {"json:build/cucumber-reports/json/cucumber.json", "pretty"},
        tags = "@SauceDemo",
        snippets = CucumberOptions.SnippetType.CAMELCASE
)

public class Runner {
    private static final EnvironmentVariables variables = SystemEnvironmentVariables.createEnvironmentVariables();

    private Runner() {
    }

    private static final String ALL_FEATURES = "@SauceDemo";
    private static final String EXTENSION_FEATURE = ".feature";

    @BeforeSuite
    public static void init() throws IOException {
        String featureName = variables.getProperty("featureName");
        List<String> features = FeatureOverwrite.listFilesByFolder(featureName, new File(PathConstants.featurePath()));
        for (String feature : features) {
            if (feature.contains(EXTENSION_FEATURE)) {
                FeatureOverwrite.overwriteFeatureFileAdd(feature);
            }
        }
        FeatureOverwrite.clearListFilesByFolder();
    }


    @AfterSuite
    public static void after() throws IOException {
        String featureName = variables.getProperty("featureName");
        List<String> features = FeatureOverwrite.listFilesByFolder(featureName, new File(PathConstants.featurePath()));
        for (String feature : features) {
            if (!featureName.equals(ALL_FEATURES) && !feature.endsWith(EXTENSION_FEATURE)) {
                feature += EXTENSION_FEATURE;
            }
            FeatureOverwrite.overwriteFeatureFileRemove(feature);
        }
        FeatureOverwrite.clearListFilesByFolder();
    }
}