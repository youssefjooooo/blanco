export const MiniCard = ({ data }) => {
  return (
    <div className="flex flex-col gap-1 grow rounded-3xl text-black bg-white p-3 px-4">
      <span className="">{data.mini_title}</span>
      <div className="w-auto flex items-center justify-between gap-2">
        <span className="text-3xl font-bold mb-2" style={{ color: data.color }}>
          ${data.value}
        </span>
        <span className="text-3xl px-4">
          {data.title && String(data.title).toUpperCase()}
        </span>
      </div>
      <span className="text-sm text-black/50">{data.mini_invoice}</span>
    </div>
  );
};
