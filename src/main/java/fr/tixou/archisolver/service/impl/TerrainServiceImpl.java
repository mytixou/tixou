package fr.tixou.archisolver.service.impl;

import fr.tixou.archisolver.domain.Terrain;
import fr.tixou.archisolver.repository.TerrainRepository;
import fr.tixou.archisolver.service.TerrainService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Terrain}.
 */
@Service
@Transactional
public class TerrainServiceImpl implements TerrainService {

    private final Logger log = LoggerFactory.getLogger(TerrainServiceImpl.class);

    private final TerrainRepository terrainRepository;

    public TerrainServiceImpl(TerrainRepository terrainRepository) {
        this.terrainRepository = terrainRepository;
    }

    @Override
    public Terrain save(Terrain terrain) {
        log.debug("Request to save Terrain : {}", terrain);
        return terrainRepository.save(terrain);
    }

    @Override
    public Optional<Terrain> partialUpdate(Terrain terrain) {
        log.debug("Request to partially update Terrain : {}", terrain);

        return terrainRepository
            .findById(terrain.getId())
            .map(existingTerrain -> {
                if (terrain.getParcelle() != null) {
                    existingTerrain.setParcelle(terrain.getParcelle());
                }
                if (terrain.getSurface() != null) {
                    existingTerrain.setSurface(terrain.getSurface());
                }

                return existingTerrain;
            })
            .map(terrainRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Terrain> findAll() {
        log.debug("Request to get all Terrains");
        return terrainRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Terrain> findOne(Long id) {
        log.debug("Request to get Terrain : {}", id);
        return terrainRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Terrain : {}", id);
        terrainRepository.deleteById(id);
    }
}
