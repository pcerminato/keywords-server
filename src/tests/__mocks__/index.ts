export const authMiddlewareMockFn = jest.fn().mockImplementation(
  (req, res, next) => {
    req.user = { id: "mock-user-id" };
    next();
  },
);
