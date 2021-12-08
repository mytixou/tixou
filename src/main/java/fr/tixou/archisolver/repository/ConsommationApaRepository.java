package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.ConsommationApa;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ConsommationApa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsommationApaRepository extends JpaRepository<ConsommationApa, Long> {}
