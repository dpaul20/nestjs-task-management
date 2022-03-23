import { Test } from '@nestjs/testing';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
});

const mockUser = {
  username: 'paul',
  id: 'someId',
  password: 'somePassword',
  Tasks: [],
};

describe('TaskService', () => {
  let tasksService: TasksService;
  let tasksRepository: TaskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTasksRepository },
      ],
    }).compile();
    tasksService = module.get(TasksService);
    tasksRepository = module.get(TaskRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', () => {
      expect(tasksRepository.getTasks).not.toHaveBeenCalled();
      // call taskService.getTasks, wich should then call the repository's getTasks
      tasksService.getTasks(null, mockUser);
      expect(tasksRepository.getTasks).toHaveBeenCalled();
    });
  });
});
