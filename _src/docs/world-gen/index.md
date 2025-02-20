---
layout: doc-layout.njk
title: World Gen
date: 2025-02-20 00:00:00 -5
eleventyNavigation:
  key: World Gen
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

### GenerateChunkData
`virtual void GenerateChunkData(ChunkData& chunkData)`

### GetBlock
`virtual uint16_t GetBlock(int x, int y, int z)`

## Variables
### Public
#### `m_seed`

### Private

## Derived Classes
- `NoiseWorldGen`
- `TerrainGen`

## Header File Code
```cpp
class WILLOWVOX_API WorldGen
{
public:
    WorldGen(int seed) : m_seed(seed) {}

    virtual void GenerateChunkData(ChunkData& chunkData)
    {
        int i = 0;
        for (int x = 0; x < CHUNK_SIZE; x++)
        {
            for (int y = 0; y < CHUNK_SIZE; y++)
            {
                for (int z = 0; z < CHUNK_SIZE; z++)
                {
                    chunkData.m_voxels[i] = GetBlock(x + chunkData.m_offset.x, y + chunkData.m_offset.y, z + chunkData.m_offset.z);
                    i++;
                }
            }
        }
    }

    virtual uint16_t GetBlock(int x, int y, int z)
    {
        return 0;
    }

    int m_seed;
};
```