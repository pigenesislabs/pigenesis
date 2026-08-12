function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Configure the PiGenesis platform.
        </p>
      </div>

      {/* Platform Settings */}
      <section className="rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold text-white">
          Platform
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-400">
              Platform Name
            </p>

            <p className="mt-2 text-lg font-medium text-white">
              PiGenesis
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Environment
            </p>

            <p className="mt-2 text-lg font-medium text-green-400">
              Production
            </p>
          </div>
        </div>
      </section>

      {/* Appearance Settings */}
      <section className="rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold text-white">
          Appearance
        </h2>

        <div className="mt-6">
          <p className="text-sm text-slate-400">
            Theme
          </p>

          <p className="mt-2 text-lg font-medium text-white">
            Dark
          </p>
        </div>
      </section>

      {/* System Settings */}
      <section className="rounded-xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold text-white">
          System
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-400">
              System Status
            </p>

            <p className="mt-2 text-lg font-medium text-green-400">
              Online
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Platform Version
            </p>

            <p className="mt-2 text-lg font-medium text-white">
              v1.0
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SettingsPage;