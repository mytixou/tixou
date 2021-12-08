package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.ConsommationPch;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ConsommationPch entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConsommationPchRepository extends JpaRepository<ConsommationPch, Long> {}
