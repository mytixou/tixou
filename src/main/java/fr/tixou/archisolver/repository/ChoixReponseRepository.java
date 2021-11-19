package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.ChoixReponse;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ChoixReponse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChoixReponseRepository extends JpaRepository<ChoixReponse, Long> {}
