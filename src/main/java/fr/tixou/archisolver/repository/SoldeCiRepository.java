package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.SoldeCi;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the SoldeCi entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SoldeCiRepository extends JpaRepository<SoldeCi, Long> {}
