'use server';

import { db } from '@/db/db';
import { tasks, type NewTask } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const getTitle = async (id: number) => {
  const [task] = await db.select().from(tasks).where(eq(tasks.id, id));

  if (!task) {
    return 'Task not found';
  }

  return task.title;
};

export interface ActionResponse {
  error?: string;
  message?: string;
}

export async function setTitle(
  data: FormData,
  id: number
): Promise<ActionResponse> {
  const title = data.get('title');
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return {
      error: 'Invalid title',
    };
  }

  const newTask: NewTask = {
    id,
    title,
  };

  try {
    await db
      .insert(tasks)
      .values(newTask)
      .onConflictDoUpdate({
        target: tasks.id,
        set: {
          title: newTask.title,
        },
      })
      .returning();
  } catch (error) {
    console.error('Error adding task', error);
    return {
      error: 'Error adding task',
    };
  }

  revalidatePath('/');

  console.log('Inserted task', newTask);
  return {
    message: 'Task added',
  };
}
