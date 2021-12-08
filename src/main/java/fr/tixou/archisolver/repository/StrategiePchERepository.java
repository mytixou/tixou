package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.StrategiePchE;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the StrategiePchE entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StrategiePchERepository extends JpaRepository<StrategiePchE, Long> {}
