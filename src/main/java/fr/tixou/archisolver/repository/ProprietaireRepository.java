package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.Proprietaire;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Proprietaire entity.
 */
@Repository
public interface ProprietaireRepository extends JpaRepository<Proprietaire, Long> {
    @Query(
        value = "select distinct proprietaire from Proprietaire proprietaire left join fetch proprietaire.locals",
        countQuery = "select count(distinct proprietaire) from Proprietaire proprietaire"
    )
    Page<Proprietaire> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct proprietaire from Proprietaire proprietaire left join fetch proprietaire.locals")
    List<Proprietaire> findAllWithEagerRelationships();

    @Query("select proprietaire from Proprietaire proprietaire left join fetch proprietaire.locals where proprietaire.id =:id")
    Optional<Proprietaire> findOneWithEagerRelationships(@Param("id") Long id);
}
