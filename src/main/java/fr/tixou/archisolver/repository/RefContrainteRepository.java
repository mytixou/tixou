package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.RefContrainte;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the RefContrainte entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RefContrainteRepository extends JpaRepository<RefContrainte, Long> {}
