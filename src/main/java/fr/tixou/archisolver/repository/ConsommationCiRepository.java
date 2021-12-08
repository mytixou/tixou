package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.ConsommationCi;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ConsommationCi entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsommationCiRepository extends JpaRepository<ConsommationCi, Long> {}
