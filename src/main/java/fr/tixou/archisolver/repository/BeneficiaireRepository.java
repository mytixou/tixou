package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.Beneficiaire;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Beneficiaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BeneficiaireRepository extends JpaRepository<Beneficiaire, String> {}
