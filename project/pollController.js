const Poll = require('./Poll');
exports.createPollGetController = (req, res, next) => {
  res.render('create');
};

exports.createPollPostController = async (req, res, next) => {
  let { title, description, options } = req.body;
  options = options.map((o) => {
    let obj = {
      name: o,
      vote: 0,
    };
    return obj;
  });
  console.log(options);

  let poll = new Poll({
    title,
    description,
    options,
  });
  try {
    await poll.save();
    res.redirect('/polls');
  } catch (error) {
    console.log(error);
  }

  res.render('create');
};

exports.getAllPolls = async (req, res, next) => {
  try {
    let polls = await Poll.find();
    res.render('polls', { polls });
  } catch (error) {
    console.log(error);
  }
};

exports.viewPollGetController = async (req, res, next) => {
  let id = req.params.id;
  try {
    let poll = await Poll.findById(id);
    let options = [...poll.options];

    let result = [];

    options.forEach((o) => {
      let percentage = ((o.vote / poll.totalVote) * 100).toFixed(2);
      result.push({
        ...o._doc,
        percentage: percentage ? percentage : 0,
      });
    });
    res.render('viewPoll', { poll, result });
  } catch (error) {
    console.log(error);
  }
};

exports.viewPollPostController = async (req, res, next) => {
  let id = req.params.id;
  let optionId = req.body.option;

  try {
    let poll = await Poll.findById(id);
    let options = [...poll.options];
    let index = options.findIndex((o) => o.id == optionId);
    options[index].vote = options[index].vote + 1;

    let totalVote = poll.totalVote + 1;
    await Poll.findOneAndUpdate(
      {
        _id: poll._id,
      },
      {
        $set: { options, totalVote },
      }
    );
    res.redirect(`/poll/${id}`);
  } catch (error) {
    console.log(error);
  }
};
