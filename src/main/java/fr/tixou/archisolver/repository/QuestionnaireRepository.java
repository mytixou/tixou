package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.Questionnaire;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Questionnaire entity.
 */
@Repository
public interface QuestionnaireRepository extends JpaRepository<Questionnaire, Long> {
    @Query(
        value = "select distinct questionnaire from Questionnaire questionnaire left join fetch questionnaire.questions",
        countQuery = "select count(distinct questionnaire) from Questionnaire questionnaire"
    )
    Page<Questionnaire> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct questionnaire from Questionnaire questionnaire left join fetch questionnaire.questions")
    List<Questionnaire> findAllWithEagerRelationships();

    @Query("select questionnaire from Questionnaire questionnaire left join fetch questionnaire.questions where questionnaire.id =:id")
    Optional<Questionnaire> findOneWithEagerRelationships(@Param("id") Long id);
}
