package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.NatureMontant;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the NatureMontant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NatureMontantRepository extends JpaRepository<NatureMontant, Long> {}
