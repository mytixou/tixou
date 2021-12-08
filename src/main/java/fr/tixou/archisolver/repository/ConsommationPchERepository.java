package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.ConsommationPchE;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ConsommationPchE entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsommationPchERepository extends JpaRepository<ConsommationPchE, Long> {}
