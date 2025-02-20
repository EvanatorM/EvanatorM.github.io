---
layout: doc-layout.njk
title: Noise World Gen
date: 2025-02-20 00:00:00 -5
eleventyNavigation:
  key: Noise World Gen
  parent: World Gen
---

# Noise World Gen
`NoiseWorldGen` is a very simple form of terrain generation. It simply uses 2D perlin noise and sets any blocks below the result height to block id 1 and any blocks above that to 0. This class is mostly in the engine so that the developer can quickly test if the project is set up correctly. `TerrainGen` is significantly more powerful. However, like `WorldGen` and `TerrainGen`, it is highly extensible.

## Include
To include `NoiseWorldGen`, use `#include <WillowVox/world/NoiseWorldGen.h>`

## Functions
There is one constructor and two other functions for `NoiseWorldGen`. These can be overridden to customize world generation.

### Constructor
`NoiseWorldGen(int seed, NoiseSettings2D& noiseSettings)`

Arguments:

`int seed`: The seed to use for generation.

`NoiseSettings2D& noiseSettings`: The 2D noise settings used for generation.

### GenerateChunkData (From Base `WorldGen`)
`virtual void GenerateChunkData(ChunkData& chunkData)`

This function is responsible for setting all the blocks in the chunk data passed to it. By default, it loops through all the blocks and calls `GetBlock` with the world position of each block. This shouldn't need to be overridden unless you need highly specialized generation.

Arguments:

`ChunkData& chunkData`: A reference to the chunk data being generated.

### GetBlock
`uint16_t GetBlock(int x, int y, int z) override`

This function decides what block to pick for the world position passed to it. This is an override from `WorldGen`, and it gets a noise value based on the noise settings, calculates the height block, and sets any block below the height block to block ID 1. Everything above the height block is set to 0 (air).

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
class WILLOWVOX_API NoiseWorldGen : public WorldGen
{
public:
    NoiseWorldGen(int seed, NoiseSettings2D& noiseSettings)
        : WorldGen(seed), m_noiseSettings(noiseSettings) {}

    uint16_t GetBlock(int x, int y, int z) override;

    NoiseSettings2D& m_noiseSettings;
};
```