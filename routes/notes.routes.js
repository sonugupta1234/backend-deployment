const express=require("express")
const NoteModel=require("../model/notes.model")

const notesRouter=express.Router()

notesRouter.get("/",(req,res)=>{
    const user=new NoteModel.find()
    .then((res1)=>{
        res.send(res1)
    })
    .catch((err)=>{
        console.log(err)
    })
})

notesRouter.post("/create", async (req,res)=>{
    const payload=req.body
    const new_note=new NoteModel(payload)
    await new_note.save()
    res.send({"msg":"Note Created"})
    })

notesRouter.patch("/update/:noteID", async(req,res)=>{
        //logic to update the notes
     const {noteID}=req.params;
     const payload=req.body
     
     const user=await NoteModel.findByIdAndUpdate({_id: +noteID}, payload) 
     res.send({"msg": "Note updated"})
})
        
notesRouter.delete("/delete/:noteID",async (req,res)=>{
        //logic to delete the notes
     const {noteID}=req.params;
     
     
     const user=await NoteModel.deleteOne({_id: +noteID}) 
     res.send({"msg": "Note deleted"})
})

module.exports=notesRouter

        
    