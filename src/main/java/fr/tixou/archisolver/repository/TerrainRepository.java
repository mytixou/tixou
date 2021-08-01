package fr.tixou.archisolver.repository;

import fr.tixou.archisolver.domain.Terrain;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Terrain entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TerrainRepository extends JpaRepository<Terrain, Long> {}
