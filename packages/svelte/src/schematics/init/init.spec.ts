import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import { join } from 'path';

import { Schema } from './schema';
import { runSchematic } from '../utils/testing';
import { readJsonInTree } from '@nrwl/workspace';

describe('init schematic', () => {
  let appTree: Tree;
  const options: Schema = {
    skipFormat: true,
    unitTestRunner: 'jest',
    e2eTestRunner: 'cypress'
  };

  const testRunner = new SchematicTestRunner(
    '@nxext/init',
    join(__dirname, '../../../collection.json')
  );

  beforeEach(() => {
    appTree = createEmptyWorkspace(Tree.empty());
  });

  it('should run successfully', async () => {
    await expect(
      runSchematic('init', options, appTree)
    ).resolves.not.toThrowError();
  });

  it('should add Svelte dependencies', async () => {
    const result = await runSchematic('init', options, appTree);
    const packageJson = readJsonInTree(result, 'package.json');
    expect(packageJson.devDependencies['svelte']).toBeDefined();
    expect(packageJson.devDependencies['svelte-preprocess']).toBeDefined();
    expect(packageJson.devDependencies['svelte-jester']).toBeDefined();
  });
});
