---
layout: doc-layout.njk
title: Terrain Gen
date: 2025-02-20 00:00:00 -5
eleventyNavigation:
  key: Terrain Gen
  parent: World Gen
---

# World Generation
Generating terrain is an essential feature of any voxel game. WillowVox Engine provides a few world generation classes to help you get started.

`WorldGen` is the base world generation class which every other world generation class must derive from. This page will cover the base `WorldGen` class, but I would highly recommend checking out the other world generation classes.

## Include
To include `WorldGen`, use `#include <WillowVox/world/WorldGen.h>`

## Functions
There is one constructor and two other functions for the base `WorldGen` class. These can be overridden to customize world generation.

### Constructor
`WorldGen(int seed)`

Arguments:

`int seed`: The seed to use for generation.

### GenerateChunkData
`virtual void GenerateChunkData(ChunkData& chunkData)`

This function is responsible for setting all the blocks in the chunk data passed to it. By default, it loops through all the blocks and calls `GetBlock` with the world position of each block. This shouldn't need to be overridden unless you need highly specialized generation.

Arguments:

`ChunkData& chunkData`: A reference to the chunk data being generated.

### GetBlock
`virtual uint16_t GetBlock(int x, int y, int z)`

This function decides what block to pick for the world position passed to it. By default, it simply returns 0 (air).

Arguments:

`int x`: The world x position of the block being generated.

`int y`: The world y position of the block being generated.

`int z`: The world z position of the block being generated.

Returns: `uint16_t`: The block ID of the block decided on by this function.

## Public Variables
### `m_seed`
The seed used for world generation.

## Derived Classes
- `NoiseWorldGen`
- `TerrainGen`

## Header File Code
```cpp
class WILLOWVOX_API TerrainGen : public WorldGen
{
public:
    TerrainGen(int seed, NoiseSettings2D* surfaceNoiseSettings, int surfaceNoiseLayers, CaveNoiseSettings* caveNoiseSettings, 
        int caveNoiseLayers, OreNoiseSettings* oreNoiseSettings, int oreNoiseLayers,
        SurfaceFeature* surfaceFeatures, int surfaceFeatureCount)
        
        : WorldGen(seed), 
        m_surfaceNoiseSettings(surfaceNoiseSettings), m_surfaceNoiseLayers(surfaceNoiseLayers),
        m_caveNoiseSettings(caveNoiseSettings), m_caveNoiseLayers(caveNoiseLayers),
        m_oreNoiseSettings(oreNoiseSettings), m_oreNoiseLayers(oreNoiseLayers),
        m_surfaceFeatures(surfaceFeatures), m_surfaceFeatureCount(surfaceFeatureCount) {}

    void GenerateChunkData(ChunkData& chunkData) override;
    // === Generation Steps ===
    /* These exist so that developers can change these behaviors
        without having to remake the whole GenerateChunkData function */
    virtual inline void GenerateChunkBlocks(ChunkData& chunkData);
    virtual inline void GenerateSurfaceFeatures(ChunkData& chunkData);
    // ========================

    uint16_t GetBlock(int x, int y, int z) override;
    // === Block Picking Functions ===
    /* These exist so that developers can change these behaviors
        without having to remake the whole GetBlock function */

    // GetSkyBlock called when block is above the surface (good to override for adding water)
    virtual inline uint16_t GetSkyBlock(int x, int y, int z, int surfaceBlock);
    // GetGroundBlock called when block is solid (not cave or ore)
    virtual inline uint16_t GetGroundBlock(int x, int y, int z, int surfaceBlock);
    // GetCaveBlock called when block is below the sky but is a cave
    virtual inline uint16_t GetCaveBlock(int x, int y, int z, int surfaceBlock);
    // GetOreBlock checks to see if the block is an ore
    virtual inline uint16_t GetOreBlock(int x, int y, int z, int surfaceBlock, uint16_t block);

    // Checks if block is cave using cave noise settings
    virtual inline bool IsCave(int x, int y, int z, int surfaceBlock);
    // Checks to see if the block is an ore and returns the type if so. Returns 0 if not.
    virtual inline uint16_t IsOre(int x, int y, int z, int surfaceBlock);
    // Gets the block that the surface is on
    virtual inline int GetSurfaceBlock(int x, int z);
    // ===============================

    // === Surface Feature Placement ===
    /* These exist so that developers can change these behaviors
        without having to remake the whole GenerateSurfaceFeatures function */

    // Override to change the conditions of surface feature placement
    // Base function checks if it is a cave or not
    virtual inline bool IsValidSurfaceFeaturePlacement(int x, int y, int z, int surfaceBlock);
    // =================================

    NoiseSettings2D* m_surfaceNoiseSettings;
    CaveNoiseSettings* m_caveNoiseSettings;
    OreNoiseSettings* m_oreNoiseSettings;
    int m_surfaceNoiseLayers, m_caveNoiseLayers, m_oreNoiseLayers;
    SurfaceFeature* m_surfaceFeatures;
    int m_surfaceFeatureCount;
};
```