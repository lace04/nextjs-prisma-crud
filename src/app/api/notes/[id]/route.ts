import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { Prisma } from '@prisma/client';

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const noteFound = await prisma.note.findUnique({
      where: {
        id: Number(params.id),
      },
    });
    if (!noteFound)
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });
    return NextResponse.json(noteFound);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deletedNote = await prisma.note.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!deletedNote)
      return NextResponse.json({ message: 'Note not found' }, { status: 404 });

    return NextResponse.json(deletedNote);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          {
            message: 'Note not found',
          },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { title, content } = await request.json();

    const updatedNote = await prisma.note.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(updatedNote);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          {
            message: 'Note not found',
          },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
