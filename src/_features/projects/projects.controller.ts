import { NotFoundException, Query, UploadedFiles } from '@nestjs/common';
import { Controller, Get, Post, Patch, Delete, Body, Param, Res } from '@nestjs/common';
import { UseGuards, UseInterceptors } from '@nestjs/common';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { AccessGuard, JwtGuard } from 'src/guards';
import { RequirePermissions } from 'src/decorators';

import { FilesService } from '../files/files.service';

import { CreateProjectDto, UpdateProjectDto } from './dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly filesService: FilesService,
  ) {}

  @Get()
  @UseGuards(AccessGuard)
  @UseGuards(JwtGuard)
  @RequirePermissions('test', 'test2', 'test3')
  async getProjects() {
    return this.projectsService.find();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    const project = await this.projectsService.findById(id);
    if (!project) throw new NotFoundException('project not found!');
    return project;
  }

  @Get(':id/file')
  async getFile(@Query('path') path: string, @Res() res) {
    const file = await this.filesService.getFile(path);

    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename=${'textfile'}`,
    });
    res.send(file);
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'doc', maxCount: 1 }], {
      storage: diskStorage({
        destination(req, file, callback) {
          callback(null, './public/uploads/projects/' + file.fieldname);
        },
        filename(req, file, callback) {
          callback(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  )
  async createProject(
    @Body() project: CreateProjectDto,
    @UploadedFiles()
    files: { doc?: Express.Multer.File[] },
  ) {
    return this.projectsService.create({ ...project, doc: files.doc[0].path });
  }

  @Patch(':id')
  async updateProject(@Param('id') id: number, @Body() project: UpdateProjectDto) {
    return this.projectsService.update(id, project);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: number) {
    const project = await this.projectsService.delete(id);
    if (!project) throw new NotFoundException('project not found!');
    return project;
  }
}
