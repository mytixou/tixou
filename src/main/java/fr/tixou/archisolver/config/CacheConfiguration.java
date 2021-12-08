package fr.tixou.archisolver.config;

import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;
import tech.jhipster.config.JHipsterProperties;
import tech.jhipster.config.cache.PrefixedKeyGenerator;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, fr.tixou.archisolver.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, fr.tixou.archisolver.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, fr.tixou.archisolver.domain.User.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.Authority.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.User.class.getName() + ".authorities");
            createCache(cm, fr.tixou.archisolver.domain.Terrain.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.Batiment.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.Local.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.Local.class.getName() + ".proprietaires");
            createCache(cm, fr.tixou.archisolver.domain.Proprietaire.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.Proprietaire.class.getName() + ".locals");
            createCache(cm, fr.tixou.archisolver.domain.Adresse.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.Departement.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.Region.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.Commanditaire.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.Dossier.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.Questionnaire.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.Questionnaire.class.getName() + ".questions");
            createCache(cm, fr.tixou.archisolver.domain.Question.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.Question.class.getName() + ".questionnaires");
            createCache(cm, fr.tixou.archisolver.domain.Reponse.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.ChoixReponse.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.Impact.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.RefContrainte.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.Beneficiaire.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.Beneficiaire.class.getName() + ".soldeCis");
            createCache(cm, fr.tixou.archisolver.domain.Beneficiaire.class.getName() + ".soldeApas");
            createCache(cm, fr.tixou.archisolver.domain.Beneficiaire.class.getName() + ".soldePches");
            createCache(cm, fr.tixou.archisolver.domain.Beneficiaire.class.getName() + ".soldePchES");
            createCache(cm, fr.tixou.archisolver.domain.Beneficiaire.class.getName() + ".consommationCis");
            createCache(cm, fr.tixou.archisolver.domain.Beneficiaire.class.getName() + ".consommationApas");
            createCache(cm, fr.tixou.archisolver.domain.Beneficiaire.class.getName() + ".consommationPches");
            createCache(cm, fr.tixou.archisolver.domain.Beneficiaire.class.getName() + ".consommationPchES");
            createCache(cm, fr.tixou.archisolver.domain.SoldeCi.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.SoldeApa.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.SoldePch.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.SoldePchE.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.TiersFinanceur.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.Aide.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.Aide.class.getName() + ".strategieCis");
            createCache(cm, fr.tixou.archisolver.domain.Aide.class.getName() + ".strategieApas");
            createCache(cm, fr.tixou.archisolver.domain.Aide.class.getName() + ".strategiePches");
            createCache(cm, fr.tixou.archisolver.domain.Aide.class.getName() + ".strategiePchES");
            createCache(cm, fr.tixou.archisolver.domain.StrategieCi.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.StrategieCi.class.getName() + ".tiersFinanceurs");
            createCache(cm, fr.tixou.archisolver.domain.StrategieCi.class.getName() + ".natureActivites");
            createCache(cm, fr.tixou.archisolver.domain.StrategieCi.class.getName() + ".natureMontants");
            createCache(cm, fr.tixou.archisolver.domain.StrategieCi.class.getName() + ".consommationCis");
            createCache(cm, fr.tixou.archisolver.domain.StrategieApa.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.StrategieApa.class.getName() + ".tiersFinanceurs");
            createCache(cm, fr.tixou.archisolver.domain.StrategieApa.class.getName() + ".natureActivites");
            createCache(cm, fr.tixou.archisolver.domain.StrategieApa.class.getName() + ".natureMontants");
            createCache(cm, fr.tixou.archisolver.domain.StrategieApa.class.getName() + ".consommationApas");
            createCache(cm, fr.tixou.archisolver.domain.StrategiePch.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.StrategiePch.class.getName() + ".tiersFinanceurs");
            createCache(cm, fr.tixou.archisolver.domain.StrategiePch.class.getName() + ".natureActivites");
            createCache(cm, fr.tixou.archisolver.domain.StrategiePch.class.getName() + ".natureMontants");
            createCache(cm, fr.tixou.archisolver.domain.StrategiePch.class.getName() + ".consommationPches");
            createCache(cm, fr.tixou.archisolver.domain.StrategiePchE.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.StrategiePchE.class.getName() + ".tiersFinanceurs");
            createCache(cm, fr.tixou.archisolver.domain.StrategiePchE.class.getName() + ".natureActivites");
            createCache(cm, fr.tixou.archisolver.domain.StrategiePchE.class.getName() + ".natureMontants");
            createCache(cm, fr.tixou.archisolver.domain.StrategiePchE.class.getName() + ".consommationPchES");
            createCache(cm, fr.tixou.archisolver.domain.NatureActivite.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.NatureMontant.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.ConsommationCi.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.ConsommationApa.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.ConsommationPch.class.getName());
            createCache(cm, fr.tixou.archisolver.domain.ConsommationPchE.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cache.clear();
        } else {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
