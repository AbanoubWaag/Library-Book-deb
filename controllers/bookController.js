const Book = require("../models/Book");


const reserveBooks = async (req, res) => {
  const { bookIds } = req.body;

  if (!bookIds || !Array.isArray(bookIds) || bookIds.length === 0) {
    return res.status(400).json({
      success: false,
      msg: "No book IDs provided",
    });
  }

  try {
    let reservedCount = 0;

    for (const id of bookIds) {
      const updated = await Book.findByIdAndUpdate(
        id,
        { isAvailable: false },
        { new: true }
      );
      if (updated) reservedCount++;
    }

    res.status(200).json({
      success: true,
      msg: "Books reserved successfully",
      count: reservedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server Error",
      error: error.message,
    });
  }
};



const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook)
      return res.status(404).json({ success: false, msg: "Book not found" });

    res.status(200).json({ success: true, msg: "Book deleted" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server Error", error: error.message });
  }
};



const bookController = { reserveBooks, deleteBook };

module.exports = bookController;
