import { NotFoundException, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { CreateProjectDto, UpdateProjectDto } from './dto';
import { ProjectsService } from './projects.service';

@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjects() {
    return this.projectsService.find();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    const project = await this.projectsService.findById(id);
    if (!project) throw new NotFoundException('project not found!');
    return project;
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'cover', maxCount: 1 },
        { name: 'photo', maxCount: 4 },
      ],
      {
        storage: diskStorage({
          destination(req, file, callback) {
            callback(null, './uploads/' + file.fieldname);
          },
          filename(req, file, callback) {
            callback(null, Date.now() + file.originalname);
          },
        }),
      },
    ),
  )
  async createProject(
    @Body() project: CreateProjectDto,
    @UploadedFiles()
    files: { cover?: Express.Multer.File[]; photo: Express.Multer.File[] },
  ) {
    return { project, files: files };

    return this.projectsService.create(project);
  }

  @Patch(':id')
  updateProject(@Param('id') id: number, @Body() project: UpdateProjectDto) {
    return this.projectsService.update(id, project);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: number) {
    const project = await this.projectsService.delete(id);
    if (!project) throw new NotFoundException('project not found!');
    return project;
  }
}
