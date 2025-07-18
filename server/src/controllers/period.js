const { Router } = require("express");
const { isUser } = require("../middlewares/guards");
const { parseError } = require("../util");
const {
  getPeriods,
  getSinglePeriod,
  createNewPeriod,
  createExpenseType,
} = require("../services/period");

const periodRouter = Router();

periodRouter.post("/budgetPeriods", async (req, res) => {
  try {
    const allBudgetPeriods = await getPeriods(req.body.periodsIds);
    res.json(allBudgetPeriods);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

periodRouter.post("/singlePeriod", async (req, res) => {
  try {
    // const budget = await getSingleBudget(req.body.budgetId);
    // res.json(budget);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

periodRouter.post("/newPeriod", isUser(), async (req, res) => {
  try {
    const data = {
      startDate: req.body.periodDate,
      budgetId: req.body.budgetId,
    };
    const newPeriod = await createNewPeriod(data);
    res.json(newPeriod);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

periodRouter.post("/newExpenseType", isUser(), async (req, res) => {
  try {
    const { newExpenseType, periodId } = req.body;
    const result = await createExpenseType(newExpenseType, periodId);
    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(403).json({ code: 403, message: parsed.errors });
  }
});

module.exports = { periodRouter };
