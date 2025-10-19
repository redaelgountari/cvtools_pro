import ResumeSchema from '@/lib/ResumeSchema';
import { mdb } from '@/lib/mongodb';
import { NextResponse, NextRequest } from "next/server";
import type { InferSchemaType } from 'mongoose';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
    try {
        type ResumeData = InferSchemaType<typeof ResumeSchema>;

        const { userData, userId } = await request.json();

        if (!userData) {
            return NextResponse.json({
                error: "No user data provided",
            }, { status: 400 });
        }

        if (!userId) {
            return NextResponse.json({
                error: "No user ID provided",
            }, { status: 400 });
        }

        const db = await mdb();
        
        if (!db) {
            return NextResponse.json({
                error: "Database connection failed",
            }, { status: 500 });
        }

        // Prepare document
        const resumeToInsert = {
            userId: userId, // Keep as string or convert to ObjectId if needed
            ...userData,
            updatedAt: new Date()
        };

        console.log("Attempting to save resume for userId:", userId);
        console.log("Data to insert:", JSON.stringify(resumeToInsert, null, 2));

        // Use updateOne with upsert instead of findOneAndUpdate
        const result = await db.collection("Resumetl").updateOne(
            { userId: userId },
            { 
                $set: resumeToInsert,
            },
            { upsert: true }
        );

        console.log("MongoDB result:", result);

        // Check if operation was successful
        if (result.acknowledged) {
            // Fetch the document to return it
            const savedResume = await db.collection("Resumetl").findOne({ userId: userId });
            
            return NextResponse.json({ 
                message: "Resume saved successfully", 
                resume: savedResume,
                operation: result.upsertedId ? 'created' : 'updated'
            }, { status: 201 });
        } else {
            throw new Error("Database operation was not acknowledged");
        }
        
    } catch (error) {
        console.error("Error saving resume:", error);
        
        return NextResponse.json({ 
            error: "Failed to save resume",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}